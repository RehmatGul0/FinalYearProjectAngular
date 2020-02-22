export interface response<T>{
    result:T
}
export interface SignIn{
    email:string,
    name:string,
    token:string
}
export interface GetDomain{
    _id:string,
    _name:string
}
export interface AddDomain{
    domainName:string
}
export interface GetAlgorithm{
    _id:string,
    _name:string
}
export interface AddAlgorithm{
    algorithmName:string
}
export interface AddQuestion{
    question : string
    answerPath : string,
    domainId : string,
    modelInfoId : string ,
}