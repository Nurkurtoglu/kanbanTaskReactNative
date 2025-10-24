import * as yup from 'yup';

export const saveFormSchema = yup.object().shape({
    userEmail: yup.string().email('Geçerli bir email adresi giriniz. Örnek: example@gmail.com').required('Bu alan zorunludur'),
    userPassword: yup.string().min(6, 'Şifre en az 6 karakter olmalı').max(25, 'En fazla 25 karakter olmalı').required('Bu alan zorunludur'),
})

export type SaveFormValues = yup.InferType<typeof saveFormSchema>;