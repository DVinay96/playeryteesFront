'use client'
import React, { useState, useEffect, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import styled from 'styled-components'
import Link from 'next/link'
import Image from 'next/image'
import { theme } from '@/styles/globalStyles'
import { useAuthStore } from '@/stores/authStore'
import { useRegisterStore } from '@/stores/regiterStore'

function LoginFormContent() {
  const [activeForm, setActiveForm] = useState<'login' | 'register' | 'forgotPassword'>('login');
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPhone, setRegisterPhone] = useState('+52');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  
  const [emailValid, setEmailValid] = useState(true);
  const [phoneValid, setPhoneValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  
  const [recoveryEmail, setRecoveryEmail] = useState('');
  
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  
  const { 
    login, 
    error: authError, 
    isLoading: authLoading, 
    requiresPasswordChange,
    forgotPassword,
    isForgotPasswordLoading,
    forgotPasswordError,
    resetPasswordSuccess,
    isAuthenticated,
    clearError: clearAuthError
  } = useAuthStore();
  
  const {
    register,
    isLoading: registerLoading,
    error: registerError,
    success: registerSuccess,
    clearError: clearRegisterError,
    reset: resetRegister,
    isPasswordValid,
    isEmailValid,
    isPhoneValid
  } = useRegisterStore();
  
  const router = useRouter();
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const formParam = params.get('form');
      const redirectPath = params.get('redirect') || '/';
      
      if (formParam && (formParam === 'register' || formParam === 'forgotPassword')) {
        setActiveForm(formParam as 'register' | 'forgotPassword');
      }
      
      if (isAuthenticated()) {
        router.push(redirectPath);
      }
    }
  }, [isAuthenticated, router]);
  
  useEffect(() => {
    if (registerEmail) setEmailValid(isEmailValid(registerEmail));
    if (registerPhone) {
      const phoneDigits = registerPhone.replace(/^\+\d+/, '');
      setPhoneValid(isPhoneValid(phoneDigits));
    }
    if (registerPassword) setPasswordValid(isPasswordValid(registerPassword));
    if (registerPassword && registerConfirmPassword) {
      setPasswordsMatch(registerPassword === registerConfirmPassword);
    }
  }, [registerEmail, registerPhone, registerPassword, registerConfirmPassword, isEmailValid, isPhoneValid, isPasswordValid]);
  
  useEffect(() => {
    clearAuthError();
    clearRegisterError();
  }, [activeForm, clearAuthError, clearRegisterError]);
  
  useEffect(() => {
    if (registerSuccess) {
      resetRegister();
      setActiveForm('login');
    }
  }, [registerSuccess, resetRegister]);
  
  const toggleForm = (form: 'login' | 'register' | 'forgotPassword') => {
    setActiveForm(form);
    clearAuthError();
    clearRegisterError();
  };
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (requiresPasswordChange) {
      if (newPassword !== confirmNewPassword) {
        alert('Las contraseñas no coinciden');
        return;
      }
      
      await login(username, password, newPassword);
    } else {
      await login(username, password);
    }
  };
  
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    
    if (!value.startsWith('+')) {
      value = '+' + value;
    }
    
    value = value.replace(/[^\d+]/g, '');
    
    setRegisterPhone(value);
  };
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setEmailValid(true);
    setPhoneValid(true);
    setPasswordValid(true);
    setPasswordsMatch(true);
    
    let isValid = true;
    
    if (!isEmailValid(registerEmail)) {
      setEmailValid(false);
      isValid = false;
    }
    
    const phoneDigits = registerPhone.replace(/^\+/, '');
    if (!isPhoneValid(phoneDigits)) {
      setPhoneValid(false);
      isValid = false;
    }
    
    if (!isPasswordValid(registerPassword)) {
      setPasswordValid(false);
      isValid = false;
    }
    
    if (registerPassword !== registerConfirmPassword) {
      setPasswordsMatch(false);
      isValid = false;
    }
    
    if (!acceptTerms) {
      alert('Debe aceptar los términos y condiciones');
      isValid = false;
    }
    
    if (!isValid) return;
    
    await register(
      registerName,
      registerUsername,
      registerEmail,
      registerPassword,
      registerPhone 
    );
  };
  
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await forgotPassword(recoveryEmail);
      alert('Se ha enviado un correo con instrucciones para recuperar su contraseña');
      toggleForm('login');
    } catch (error) {
    }
  };
  
  const getRedirectUrl = () => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('redirect') || '/';
    }
    return '/';
  };
  
  return (
    <>
      <LogoContainer>
        <Image 
          src="/logo.png" 
          alt="Logo" 
          width={150} 
          height={60}
          priority
        />
      </LogoContainer>
      
      {!requiresPasswordChange ? (
        <>
          <FormTabs>
            <FormTab 
              active={activeForm === 'login'} 
              onClick={() => toggleForm('login')}
            >
              Iniciar Sesión
            </FormTab>
            <FormTab 
              active={activeForm === 'register'} 
              onClick={() => toggleForm('register')}
            >
              Registrarse
            </FormTab>
          </FormTabs>
          
          {authError && <ErrorMessage>{authError}</ErrorMessage>}
          {registerError && <ErrorMessage>{registerError}</ErrorMessage>}
          {forgotPasswordError && <ErrorMessage>{forgotPasswordError}</ErrorMessage>}
          {resetPasswordSuccess && (
            <SuccessMessage>Contraseña restablecida exitosamente. Ya puede iniciar sesión.</SuccessMessage>
          )}
          
          {activeForm === 'login' && (
            <Form onSubmit={handleLogin}>
              <FormGroup>
                <Label htmlFor="username">Usuario o Correo Electrónico</Label>
                <Input 
                  id="username"
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="usuario o correo@ejemplo.com"
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="password">Contraseña</Label>
                <Input 
                  id="password"
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </FormGroup>
              
              <FormRow>
                <CheckboxGroup>
                  <Checkbox 
                    id="remember-me"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                  <CheckboxLabel htmlFor="remember-me">Recordarme</CheckboxLabel>
                </CheckboxGroup>
                
                <ForgotPasswordLink onClick={() => toggleForm('forgotPassword')}>
                  ¿Olvidó su contraseña?
                </ForgotPasswordLink>
              </FormRow>
              
              <SubmitButton 
                type="submit" 
                disabled={authLoading}
              >
                {authLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </SubmitButton>
            </Form>
          )}
          
          {activeForm === 'register' && (
            <Form onSubmit={handleRegister}>
              <FormGroup>
                <Label htmlFor="register-name">Nombre Completo</Label>
                <Input 
                  id="register-name"
                  type="text" 
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  placeholder="Juan Pérez"
                  required
                />
              </FormGroup>
              
              <FormRow>
                <FormGroupHalf>
                  <Label htmlFor="register-email">Correo Electrónico</Label>
                  <Input 
                    id="register-email"
                    type="email" 
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    placeholder="correo@ejemplo.com"
                    isInvalid={!emailValid}
                    required
                  />
                  {!emailValid && <ValidationMessage>Correo electrónico inválido</ValidationMessage>}
                </FormGroupHalf>
                
                <FormGroupHalf>
                  <Label htmlFor="register-phone">Teléfono</Label>
                  <Input 
                    id="register-phone"
                    type="tel" 
                    value={registerPhone}
                    onChange={handlePhoneChange}
                    placeholder="+521234567890"
                    isInvalid={!phoneValid}
                    required
                  />
                  {!phoneValid && (
                    <ValidationMessage>
                      Teléfono inválido (formato: +52 seguido de 7-15 dígitos)
                    </ValidationMessage>
                  )}
                  <HelperText>Formato: +52 seguido del número sin espacios</HelperText>
                </FormGroupHalf>
              </FormRow>
              
              <FormGroup>
                <Label htmlFor="register-username">Nombre de Usuario</Label>
                <Input 
                  id="register-username"
                  type="text" 
                  value={registerUsername}
                  onChange={(e) => setRegisterUsername(e.target.value)}
                  placeholder="usuario123"
                  required
                />
              </FormGroup>
              
              <FormRow>
                <FormGroupHalf>
                  <Label htmlFor="register-password">Contraseña</Label>
                  <Input 
                    id="register-password"
                    type="password" 
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    placeholder="••••••••"
                    isInvalid={!passwordValid}
                    required
                  />
                  {!passwordValid && (
                    <ValidationMessage>
                      La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y caracteres especiales
                    </ValidationMessage>
                  )}
                </FormGroupHalf>
                
                <FormGroupHalf>
                  <Label htmlFor="register-confirm-password">Confirmar Contraseña</Label>
                  <Input 
                    id="register-confirm-password"
                    type="password" 
                    value={registerConfirmPassword}
                    onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    isInvalid={!passwordsMatch}
                    required
                  />
                  {!passwordsMatch && <ValidationMessage>Las contraseñas no coinciden</ValidationMessage>}
                </FormGroupHalf>
              </FormRow>
              
              <PasswordRequirements>
                <RequirementTitle>La contraseña debe cumplir con:</RequirementTitle>
                <RequirementsList>
                  <Requirement>Mínimo 8 caracteres</Requirement>
                  <Requirement>Al menos una letra mayúscula</Requirement>
                  <Requirement>Al menos una letra minúscula</Requirement>
                  <Requirement>Al menos un número</Requirement>
                  <Requirement>Al menos un carácter especial (@$!%*?&)</Requirement>
                </RequirementsList>
              </PasswordRequirements>
              
              <CheckboxGroup>
                <Checkbox 
                  id="accept-terms"
                  checked={acceptTerms}
                  onChange={() => setAcceptTerms(!acceptTerms)}
                />
                <CheckboxLabel htmlFor="accept-terms">
                  Acepto los <TermsLink href="/terms">términos y condiciones</TermsLink> y la <TermsLink href="/privacy">política de privacidad</TermsLink>
                </CheckboxLabel>
              </CheckboxGroup>
              
              <SubmitButton 
                type="submit" 
                disabled={registerLoading}
              >
                {registerLoading ? 'Registrando...' : 'Registrarse'}
              </SubmitButton>
            </Form>
          )}
          
          {activeForm === 'forgotPassword' && (
            <Form onSubmit={handleForgotPassword}>
              <FormGroup>
                <Label htmlFor="recovery-email">Correo Electrónico</Label>
                <Input 
                  id="recovery-email"
                  type="email" 
                  value={recoveryEmail}
                  onChange={(e) => setRecoveryEmail(e.target.value)}
                  placeholder="correo@ejemplo.com"
                  required
                />
              </FormGroup>
              
              <FormActions>
                <BackButton type="button" onClick={() => toggleForm('login')}>
                  Volver
                </BackButton>
                
                <SubmitButton 
                  type="submit" 
                  disabled={isForgotPasswordLoading}
                >
                  {isForgotPasswordLoading ? 'Enviando...' : 'Enviar Correo de Recuperación'}
                </SubmitButton>
              </FormActions>
            </Form>
          )}
        </>
      ) : (
        <>
          <FormHeader>Cambio de Contraseña Requerido</FormHeader>
          
          {authError && <ErrorMessage>{authError}</ErrorMessage>}
          
          <Form onSubmit={handleLogin}>
            <FormGroup>
              <Label htmlFor="new-password">Nueva Contraseña</Label>
              <Input 
                id="new-password"
                type="password" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Nueva contraseña"
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="confirm-new-password">Confirmar Nueva Contraseña</Label>
              <Input 
                id="confirm-new-password"
                type="password" 
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                placeholder="Confirmar nueva contraseña"
                required
              />
            </FormGroup>
            
            <PasswordRequirements>
              <RequirementTitle>La contraseña debe cumplir con:</RequirementTitle>
              <RequirementsList>
                <Requirement>Mínimo 8 caracteres</Requirement>
                <Requirement>Al menos una letra mayúscula</Requirement>
                <Requirement>Al menos una letra minúscula</Requirement>
                <Requirement>Al menos un número</Requirement>
                <Requirement>Al menos un carácter especial (@$!%*?&)</Requirement>
              </RequirementsList>
            </PasswordRequirements>
            
            <SubmitButton 
              type="submit" 
              disabled={authLoading}
            >
              {authLoading ? 'Cambiando contraseña...' : 'Cambiar Contraseña y Continuar'}
            </SubmitButton>
          </Form>
        </>
      )}
    </>
  );
}

export default function LoginPage() {
  return (
    <PageContainer>
      <LoginContainer>
        <Suspense fallback={<LoadingState>Cargando...</LoadingState>}>
          <LoginFormContent />
        </Suspense>
      </LoginContainer>
    </PageContainer>
  );
}

const LoadingState = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${theme.colors.text.secondary};
`;

// Styled Components
const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
  background-color: #f8f9fa;
`;

const LoginContainer = styled.div`
  width: 100%;
  max-width: 500px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

const FormHeader = styled.h2`
  font-size: 1.5rem;
  color: ${theme.colors.text.primary};
  margin-bottom: 1.5rem;
  text-align: center;
`;

const FormTabs = styled.div`
  display: flex;
  margin-bottom: 2rem;
  border-bottom: 1px solid #e0e0e0;
`;

const FormTab = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 1rem;
  background-color: transparent;
  border: none;
  font-size: 1rem;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  color: ${props => props.active ? theme.colors.text.primary : theme.colors.text.secondary};
  cursor: pointer;
  border-bottom: 2px solid ${props => props.active ? theme.colors.secondary : 'transparent'};
  transition: all 0.3s ease;
  
  &:hover {
    color: ${theme.colors.text.primary};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormGroupHalf = styled(FormGroup)`
  flex: 1;
`;

const FormRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  
  @media (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Label = styled.label`
  font-size: 0.9rem;
  color: ${theme.colors.text.secondary};
  margin-bottom: 0.5rem;
`;

const Input = styled.input<{ isInvalid?: boolean }>`
  padding: 0.75rem 1rem;
  border: 1px solid ${props => props.isInvalid ? '#d43939' : '#e0e0e0'};
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    border-color: ${props => props.isInvalid ? '#d43939' : theme.colors.secondary};
    outline: none;
    box-shadow: 0 0 0 3px ${props => props.isInvalid ? 'rgba(212, 57, 57, 0.1)' : 'rgba(92, 165, 62, 0.1)'};
  }
  
  &::placeholder {
    color: #ccc;
  }
`;

const HelperText = styled.small`
  color: ${theme.colors.text.secondary};
  font-size: 0.75rem;
  margin-top: 0.25rem;
  display: block;
`;

const ValidationMessage = styled.p`
  color: #d43939;
  font-size: 0.8rem;
  margin-top: 0.3rem;
  margin-bottom: 0;
`;

const SubmitButton = styled.button`
  padding: 1rem;
  background-color: ${theme.colors.secondary};
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #5ca53e; /* Darker version of the secondary color */
  }
  
  &:disabled {
    background-color: #aad399;
    cursor: not-allowed;
  }
`;

const BackButton = styled.button`
  padding: 1rem;
  background-color: white;
  color: ${theme.colors.text.secondary};
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #f8f9fa;
  }
`;

const FormActions = styled.div`
  display: flex;
  gap: 1rem;
  
  ${BackButton} {
    flex: 1;
  }
  
  ${SubmitButton} {
    flex: 2;
  }
  
  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  width: 18px;
  height: 18px;
  accent-color: ${theme.colors.secondary};
  cursor: pointer;
`;

const CheckboxLabel = styled.label`
  font-size: 0.9rem;
  color: ${theme.colors.text.secondary};
  cursor: pointer;
`;

const ForgotPasswordLink = styled.button`
  font-size: 0.9rem;
  color: ${theme.colors.secondary};
  text-decoration: none;
  background: none;
  border: none;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`;

const TermsLink = styled(Link)`
  color: ${theme.colors.secondary};
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const ErrorMessage = styled.div`
  padding: 0.75rem;
  background-color: #fff2f2;
  border: 1px solid #ffcaca;
  border-radius: 4px;
  color: #d43939;
  margin-bottom: 1.5rem;
`;

const SuccessMessage = styled.div`
  padding: 0.75rem;
  background-color: #f3fff6;
  border: 1px solid #b9e9c5;
  border-radius: 4px;
  color: #2e7d32;
  margin-bottom: 1.5rem;
`;

const PasswordRequirements = styled.div`
  background-color: #f9f9f9;
  padding: 1rem;
  border-radius: 4px;
  border-left: 3px solid ${theme.colors.secondary};
`;

const RequirementTitle = styled.p`
  font-size: 0.9rem;
  font-weight: bold;
  color: ${theme.colors.text.primary};
  margin-bottom: 0.5rem;
`;

const RequirementsList = styled.ul`
  margin: 0;
  padding-left: 1.5rem;
`;

const Requirement = styled.li`
  font-size: 0.85rem;
  color: ${theme.colors.text.secondary};
  margin-bottom: 0.25rem;
`;