enum Keys{
  Token = 'token',
  UserId = 'userId',
  ExpireTime = 'expireTime'
}
export const getToken = ()=>{
  return sessionStorage.getItem(Keys.Token)
}