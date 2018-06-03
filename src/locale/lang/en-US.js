export default {
  app: {
    name: 'BManagerS',
    shortName: 'BMS'
  },
  msg: {
    err401: 'Oh~~You do not have permission to do this!~',
    err404: 'Oh~~Your page was missing!~',
    code9999: 'Unknown Error, Please connect admin!',
    code9998: 'Has Not Login Or Invalid Login!',
    code9997: 'You do not have permission!',
    code9996: 'Network Error, Please retry later!',
    code0000: 'Operate Success!'
  },
  route: {
    login: 'Login',
    lock: 'Lock Screen',
    home: 'Home',
    system: 'System',
    user: 'User Namage',
    role: 'Role Manage',
    menu: 'Menu Manage'
  },
  confirm: {
    recoveryTitle: 'Recovery Confirm',
    recoveryContent: 'Confirm To Recovery This Item?',
    disableTitle: 'Disable Confirm',
    disableContent: 'Confirm To Disable This Item?',
    deleteTitle: 'Delete Confirm',
    deleteContent: 'Confirm To Delete This Item?'
  },
  status: {
    enable: 'Enable',
    disable: 'Disable',
    locked: 'Locked'
  },
  btn: {
    query: 'Query',
    cancel: 'Cancel',
    submit: 'Submit',
    clear: 'Clear',
    create: 'Create',
    edit: 'Edit',
    logout: 'Logout',
    delete: 'Delete',
    setRole: 'GrantRole',
    editPwd: 'EditPassword',
    backHome: 'Back To Home',
    backPrev: 'Back To Previous',
    closeOther: 'Close Other',
    closeAll: 'Close All'
  },
  entity: {
    user: 'User',
    role: 'Role'
  },
  field: {
    id: 'ID',
    username: 'Username',
    name: 'Name',
    status: 'Status',
    password: 'Password',
    createdTime: 'CreatedTime',
    updatedTime: 'UpdateTime',
    operation: 'Operation'
  },
  placeholder: {
    username: 'Please Input Username',
    password: 'Please Input Password',
    name: 'Please Input Name',
    startDate: 'Please Input Create Start Date',
    endDate: 'Please Input Create End Date',
    lockPwd: 'Equals to Login Password'
  },
  lockPage: {
    lockScreen: 'Lock Screen',
    lock: 'Unlock'
  },
  loginPage: {
    title: 'Welcome Login',
    submit: 'Login',
    experience: 'Experience Account'
  },
  valid: {
    usernameRequired: 'username can not be none',
    usernameMin: 'username min length is {0}',
    usernameMax: 'username max length is {0}',
    usernameExists: 'username already exists',
    passwordRequired: 'password can not be none',
    passwordMin: 'password min length is {0}',
    passwordMax: 'password max length is {0}',
    nameRequired: 'password can not be none',
    nameMin: 'name min length is {0}',
    nameMax: 'name max length is {0}'
  }
}
