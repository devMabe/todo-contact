import { UserModel } from 'src/users/models/user.model'
import { UserPresenter } from 'src/users/presenters/user.presenter'

export const toTransfromUser = (user: UserModel) => {
  const response: UserPresenter = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  }

  return response
}
