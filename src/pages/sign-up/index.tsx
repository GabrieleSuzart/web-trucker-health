import React, { useCallback, useRef, FC } from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { Container, Content, Background } from './styles';
import { Stack, Text, Input, Button, Logo } from '../../design-system';
import { getValidationErrors } from '../../utils/get-validation-erros';

export const SignUp: FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: object) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string().required('E-mail obrigatório').email(),
        password: Yup.string().min(6, 'No mínimo 6 dígitos'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (err) {
      const errors = getValidationErrors(err);

      formRef.current?.setErrors(errors);
    }
  }, []);

  return (
    <Container>
      <Background />
      <Content>
        <Logo labelPosition="bottom" size={120} textSize="x3" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <Stack margin="x3">
            <Text as="h1" textSize="x4" textAlign="center">
              Faça seu cadastro
            </Text>
            <Stack margin="x1">
              <Input name="name" icon={FiUser} type="text" placeholder="Nome" />

              <Input
                name="email"
                icon={FiMail}
                type="email"
                placeholder="E-mail"
              />

              <Input
                name="password"
                icon={FiLock}
                type="password"
                placeholder="Senha"
              />
            </Stack>
            <Button type="submit">Cadastrar</Button>
          </Stack>
        </Form>

        <a href="signup">
          <FiArrowLeft />
          Voltar para logon
        </a>
      </Content>
    </Container>
  );
};
