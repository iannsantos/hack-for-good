import * as Yup from 'yup';

export default async function validator(data, formRef) {
  try {
    const schema = Yup.object().shape({
      company: Yup.string().required('O seu nome é obrigatório'),
      email: Yup.string()
        .email('Digite um e-mail válido')
        .required('O e-mail é obrigatório'),
      login: Yup.string()
        .min(8, 'O login é muito curto')
        .required('O login é obrigatório'),
      password: Yup.string()
        .min(6, 'A senha é muito curta')
        .required('A senha é obrigatória'),
      cpf: Yup.string()
        .matches(/^[0-9]*$/, 'Formato inválido')
        .required('Informe o seu CPF'),
      cep: Yup.string()
        .matches(/^[0-9]*$/, 'Formato inválido')
        .required('Informe o seu CEP'),
      address: Yup.object().shape({
        street: Yup.string()
          .min(3, 'No mínimo 3 caracteres')
          .required('A rua é obrigatória'),
        neighborhood: Yup.string().required('O bairro é obrigatório'),
        city: Yup.string().required('A cidade é obrigatória'),
        uf: Yup.string().required('Favor informar o UF').max(2, 'UF inválido'),
      }),
    });

    await schema.validate(data, { abortEarly: false });

    formRef.current.setErrors({});
  } catch (err) {
    if (err instanceof Yup.ValidationError) {
      const errorMessages = {};

      err.inner.forEach((error) => {
        errorMessages[error.path] = error.message;
      });

      formRef.current.setErrors(errorMessages);
    }
  }
}
