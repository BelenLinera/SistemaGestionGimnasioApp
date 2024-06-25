// import React from 'react';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import { BrowserRouter as Router } from 'react-router-dom';
// import '@testing-library/jest-dom/extend-expect';
// import Login from './Login';
// import UserContext from '../Context/UserContext';
// import api from '../../api';

//prueba 1

// jest.mock('../../api');

// describe('Tests on <Login />', () => {
//   const user = {
//     email:'alejopichini@gmail.com',
//     password: '123456Beli-'
//   };
  
//   test('shoul show the component without the user', () => {
//     render(
//         <UserContext.Provider value={{user:null}}>
//             <Router>
//                 <Login/>
//             </Router>
//         </UserContext.Provider>
//     );
//     const preTag = screen.getByLabelText('pre');
//     expect (preTag.innerHTML).toBe('null');
//   });

//  test ('shoul call setUser when btn clicked', () => {
//     const setUserMock = jest.fn();
// render(
//     <UserContext.Provider value ={{user: null, setUser: setUserMock}}>
//         <Router>
//             <Login/>
//         </Router>
//     </UserContext.Provider>
// ); 
// screen.debug();
// const btnElement = screen.getByRole('button');
//     fireEvent.click(btnElement);
//     expect(setUserMock).toHaveBeenCalledWith({
//         email: "facusturtz@gmail.com",
//         password:"123456Facu"
//     });


//  });
// })

//prueba 2


// jest.mock('../../api');

// describe('Tests on <Login />', () => {
//   const user = {
//     email: 'alejopichini@gmail.com',
//     password: '123456Beli-'
//   };

//   test('should show the component without the user', () => {
//     render(
//       <UserContext.Provider value={{ user: null }}>
//         <Router>
//           <Login />
//         </Router>
//       </UserContext.Provider>
//     );
    
//     // Verificar que los elementos del formulario estén presentes
//     expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
//     expect(screen.getByPlaceholderText(/Contraseña/i)).toBeInTheDocument();
//     expect(screen.getByText(/Iniciar sesión/i)).toBeInTheDocument();
    
//     // Verificar que los enlaces estén presentes
//     expect(screen.getByText(/Registrate/i)).toBeInTheDocument();
//     expect(screen.getByText(/Recuperar/i)).toBeInTheDocument();
//   });

//   test('should call login when btn clicked', async () => {
//     const loginMock = jest.fn();
//     api.post.mockResolvedValueOnce({ data: user });

//     render(
//       <UserContext.Provider value={{ user: null, login: loginMock }}>
//         <Router>
//           <Login />
//         </Router>
//       </UserContext.Provider>
//     );

//     fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'facusturtz@gmail.com' } });
//     fireEvent.change(screen.getByPlaceholderText(/Contraseña/i), { target: { value: '123456Facu' } });

//     fireEvent.click(screen.getByRole('button'));

//     await waitFor(() => {
//       expect(loginMock).toHaveBeenCalledWith(user);
//     });
//   });
// });



//prueba 3 



// import {render, screen} from '@testing-library/react';
// import Login from './Login';
// //import UserContext from '../Context/UserContext';
// import { UserProvider } from '../Context/UserContext';
// //import { BrowserRouter as Router } from 'react-router-dom';
// //import api from '../../api';

// jest.mock('../../api'); // Asegúrate de que la ruta sea correcta

// describe ("<Login />", () => {
//     test("renders the login component", () => {
//         render(
//         //<Login/> <Router> 
//         <UserProvider value={{ user: null }}>
//           <Login />
//         </UserProvider>
//     );

//         const buttonElement = screen.getByText(/Iniciar sesión/i);

//         expect(buttonElement).toBeInTheDocument();
//     });
// });

//prueba 4


// // Importa las herramientas necesarias de testing
// import React from 'react';
// import { render, screen, fireEvent, waitFor, expect } from '@testing-library/react';
// import { Login } from './Login'; // Ajusta la importación según la ubicación real de tu componente
// import UserContext from '../Context/UserContext';


// describe('Login Component', () => {
//   test('should login successfully', async () => {
//     // Mock the login function from UserContext
//     const mockLogin = jest.fn();

//     // Mock the navigate function from react-router-dom
//     const mockNavigate = jest.fn();

//     // Render the Login component with mocked context and navigate
//     render(
//       <UserContext.Provider value={{ login: mockLogin }}>
//         <Login />
//       </UserContext.Provider>
//     );

//     // Simulate user input
//     const emailInput = screen.getByPlaceholderText('Email');
//     const passwordInput = screen.getByPlaceholderText('Contraseña');
//     const loginButton = screen.getByText('Iniciar sesión');

//     fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
//     fireEvent.change(passwordInput, { target: { value: 'password123' } });

//     // Simulate form submission
//     fireEvent.click(loginButton);

//     // Wait for the login function to be called asynchronously
//     await waitFor(() => {
//       expect(mockLogin).toHaveBeenCalledTimes(1);
//       expect(mockLogin).toHaveBeenCalledWith(expect.objectContaining({
//         email: 'test@example.com',
//         password: 'password123'
//       }));
//     });

//     // Optionally, you can also assert navigation behavior
//     expect(mockNavigate).toHaveBeenCalledWith('/', { replace: true });
//   });

//   // You can add more test cases for invalid credentials, error handling, etc.
// });

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Login } from './Login'; // Ajusta la importación según la ubicación real de tu componente
import UserContext from '../Context/UserContext';


describe('Login Component', () => {
  test('should login successfully', async () => {
    const mockLogin = jest.fn();
    const mockNavigate = jest.fn();

    render(
      <UserContext.Provider value={{ login: mockLogin }}>
        <Login />
      </UserContext.Provider>
    );

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Contraseña');
    const loginButton = screen.getByText('Iniciar sesión');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    fireEvent.click(loginButton);

    // Espera a que se llame a la función de login
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledTimes(1);
    });

    // Verifica los detalles específicos del login
    expect(mockLogin).toHaveBeenCalledWith(expect.objectContaining({
      email: 'test@example.com',
      password: 'password123'
    }));

    // Verifica la navegación después del login exitoso
    expect(mockNavigate).toHaveBeenCalledWith('/', { replace: true });
  });
});