import * as interfaces from '../interfaces/interfaces';
import * as authRepos from  '../repositories/authRepositories';
import * as bcrypt from '../utils/bcryptUtils';
import * as jwt from '../utils/jwtUtils'

export async function signUp(userData: interfaces.userData) {
    const user = await authRepos.findUserByEmail(userData.email);
    if(user)throw { type: 'conflict', message: 'conflict'};

    const encryptedPassword = bcrypt.hashPassword(userData.password);
    await authRepos.insertUser({ ...userData, password: encryptedPassword});
}


export async function signIn(userData: interfaces.userData) {
    const user = await authRepos.findUserByEmail(userData.email);
    if(!user) throw { type: 'unauthorized', message: 'unauthorized'};

    const result = bcrypt.comparePasswords(userData.password, user.password);
    if(!result)throw { type: 'unauthorized', message: 'unauthorized'};

    const token = jwt.createToken({ userId: user.id});

    return token 
}