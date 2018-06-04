export default {
  app: {
    name: 'BManagerS',
    shortName: 'BMS',
    '401': 'Oh~~You do not have permission to do this!~',
    '404': 'Oh~~Your page was missing!~'
  },
  respCode: {
    '9999': 'Unknown Error, Please connect admin!',
    '9998': 'Has Not Login Or Invalid Login!',
    '9997': 'You do not have permission!',
    '9996': 'Network Error, Please retry later!',
    '1001': 'Username Or Password Error!',
    '1002': 'Password Error, Clear Cookie If Forgot！',
    '0000': 'Operate Success!'
  },
  notice: {
    title: 'Notice'
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
    locked: 'Locked',
    fullScreen: 'Full Screen',
    exitFullScreen: 'Exit Full Screen'
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
    backHome: 'Back To Home',
    backPrev: 'Back To Previous',
    closeOther: 'Close Other',
    closeAll: 'Close All'
  },
  route: {
    all: 'All Menu',
    login: 'Login',
    lock: 'Lock Screen',
    home: 'Home',
    system: 'System',
    user: 'User Namage',
    role: 'Role Manage',
    menu: 'Menu Manage',
    my: 'My',
    info: 'Info'
  },
  login: {
    title: 'Welcome Login',
    submit: 'Login',
    experience: 'Experience Account',
    placeholder: {
      username: 'Please Input Username',
      password: 'Please Input Password'
    },
    valid: {
      username: {
        required: 'username can not be none',
        min: 'username min length is {0}',
        max: 'username max length is {0}'
      },
      password: {
        required: 'password can not be none',
        min: 'password min length is {0}',
        max: 'password max length is {0}'
      }
    }
  },
  lock: {
    lockScreen: 'Lock Screen',
    unlock: 'Unlock',
    placeholder: {
      password: 'Equals to Login Password'
    }
  },
  user: {
    entity: 'User',
    label: {
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
      endDate: 'Please Input Create End Date'
    },
    valid: {
      username: {
        required: 'username can not be none',
        min: 'username min length is {0}',
        max: 'username max length is {0}',
        exists: 'username already exists'
      },
      password: {
        required: 'password can not be none',
        min: 'password min length is {0}',
        max: 'password max length is {0}'
      },
      name: {
        required: 'user name can not be none',
        min: 'user name min length is {0}',
        max: 'user name max length is {0}'
      }
    },
    btn: {
      setRole: 'Set Role',
      editPwd: 'Edit Password'
    }
  },
  role: {
    entity: 'Role',
    label: {
      id: 'ID',
      code: 'Code',
      name: 'Name',
      status: 'Status',
      createdTime: 'CreatedTime',
      updatedTime: 'UpdateTime',
      operation: 'Operation'
    },
    placeholder: {
      code: 'Please Input Role Code',
      name: 'Please Input Role Name',
      startDate: 'Please Input Create Start Date',
      endDate: 'Please Input Create End Date'
    },
    valid: {
      code: {
        required: 'role code can not be none',
        min: 'role code min length is {0}',
        max: 'role code max length is {0}',
        exists: 'role code already exists'
      },
      name: {
        required: 'role name can not be none',
        min: 'role name min length is {0}',
        max: 'role name max length is {0}'
      }
    },
    btn: {
      setMenu: 'Set Menu'
    }
  },
  menu: {
    entity: 'Menu',
    label: {
      pcode: 'Parent Menu',
      code: 'Menu Code',
      icon: 'Menu Icon',
      sort: 'Sort'
    },
    placeholder: {
      code: 'Please Input Menu Code',
      icon: 'Please Input Menu Icon',
      sort: 'Please Input Sort（0 On Top）'
    },
    valid: {
      code: {
        required: 'menu code can not be none',
        min: 'menu code min length is {0}',
        max: 'menu code max length is {0}',
        exists: 'menu code already exists'
      },
      icon: {
        min: 'menu icon min length is {0}',
        max: 'menu icon max length is {0}'
      },
      sort: {
        number: 'menu sort must be number between 0 and 99'
      }
    }
  }
}
