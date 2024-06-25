const axios = {
    create: jest.fn(() => axios),
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  };
  
  export default axios;
  