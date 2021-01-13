import {useFormik} from "formik";
import * as Yup from "yup";

export const LoginPage = ({authorizationHandler, error, loading}) => {

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Некорректный email")
                .required("Поле обязательно"),
            password: Yup.string()
                .min(6, "Минимум 6 символов")
                .max(15, "Максимум 15 символов")
                .required("Поле обязательно")
        }),
        enableReinitialize: true,
        onSubmit: values => {
            authorizationHandler(values);
        }
    });

    const isEmailError = formik.touched.email && formik.errors.email;
    const isPasswordError = formik.touched.password && formik.errors.password;

    return (
        <div className="row justify-content-center">
            <div className="col-auto col-sm-8 col-lg-6 pt-5">
                <i className="fas fa-user-lock fa-2x text-center d-block"/>
                <h1 className="text-center mb-3">Авторизация</h1>
                <form onSubmit={formik.handleSubmit} className="needs-validation" noValidate>
                    <div className="mb-3">
                        <label htmlFor="email" className={
                            isEmailError
                                ? "form-label text-danger"
                                : "form-label"
                        }>Email</label>
                        <input
                            type="email"
                            className={
                                isEmailError
                                    ? "form-control border-danger shadow-none"
                                    : "form-control"
                            }
                            id="email"
                            name="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                        {isEmailError ? <small className="text-danger">{formik.errors.email}</small> : null}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className={
                            isPasswordError
                                ? "form-label text-danger"
                                : "form-label"
                        }>Пароль</label>
                        <input
                            type="password"
                            className={
                                isPasswordError
                                    ? "form-control border-danger shadow-none"
                                    : "form-control"
                            }
                            id="password"
                            name="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                        />
                        {isPasswordError ? <small className="text-danger">{formik.errors.password}</small> : null}
                    </div>
                    <div className="text-center">
                        {error ? <small className="text-danger d-block mb-3">{error}</small> : null}
                        <button
                            type="submit"
                            className="btn btn-outline-primary btn-lg"
                            disabled={isEmailError || isPasswordError || loading}
                        >Войти
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}