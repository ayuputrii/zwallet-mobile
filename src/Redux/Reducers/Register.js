import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  REGISTER_PIN_REQUEST,
  REGISTER_PIN_SUCCESS,
  REGISTER_PIN_FAILED,
  REG_RES_REQUEST,
  REG_RES_SUCCESS,
  REG_RES_FAILED,
} from '../Type/Register';

const initialState = {
  data: {
    name: '',
    email: '',
    password: '',
    pin: '',
  },
  loading: false,
  isSuccess: false,
  message: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        message: action.payload,
      };
    case REGISTER_FAILED:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        message: action.payload,
      };
    case REGISTER_PIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case REGISTER_PIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        message: action.payload,
      };
    case REGISTER_PIN_FAILED:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        message: action.payload,
      };
    case REG_RES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case REG_RES_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        message: action.payload,
      };
    case REG_RES_FAILED:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        message: action.payload,
      };
    default:
      return {
        ...state,
        isFormFilled: false,
      };
  }
};
