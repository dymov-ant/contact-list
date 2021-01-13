import {useFormik} from "formik";
import * as Yup from "yup";

export const ContactForm = ({id, name, phone, photo, email, onSubmit, isEdit}) => {

    const formik = useFormik({
        initialValues: {
            id,
            photo,
            name,
            phone,
            email
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Некорректный email")
                .required("Поле обязательно"),
            name: Yup.string().trim()
                .min(3, "Минимум 3 символов")
                .max(20, "Максимум 15 символов")
                .required("Поле обязательно"),
            photo: Yup.string()
                .url("Некорректный url"),
            phone: Yup.string()
                .matches(/^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{7,10}$/, "Неверный формат номера")
                .required("Поле обязательно")
        }),
        onSubmit: (values, {resetForm}) => {
            onSubmit(values);
            resetForm();
        }
    });

    const isEmailError = formik.touched.email && formik.errors.email;
    const isNameError = formik.touched.name && formik.errors.name;
    const isPhotoError = formik.touched.photo && formik.errors.photo;
    const isPhoneError = formik.touched.phone && formik.errors.phone;

    const phoneKeyPress = event => {
        const keyCode = event.keyCode || event.which;
        const keyValue = String.fromCharCode(keyCode);
        const regex = /^[А-Яа-яA-Za-z]$/;
        if (regex.test(keyValue)) {
            event.preventDefault();
        }
    };

    return (
        <form className="p-3" onSubmit={formik.handleSubmit}>
            <img
                src={
                    isEdit
                        ? photo || "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Placeholder_no_text.svg/1200px-Placeholder_no_text.svg.png"
                        : "http://cdn.onlinewebfonts.com/svg/img_277386.png"
                }
                className="card-img-top mb-2"
                alt="user"
            />
            <div className="mb-2">
                <input
                    type="text"
                    className={
                        isPhotoError
                            ? "form-control border-danger shadow-none"
                            : "form-control"
                    }
                    placeholder="url-адрес аватарки"
                    name="photo"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.photo}
                />
                {isPhotoError ? <small className="text-danger">{formik.errors.photo}</small> : null}
            </div>
            <div className="mb-2">
                <input
                    type="text"
                    className={
                        isNameError
                            ? "form-control border-danger shadow-none"
                            : "form-control"
                    }
                    placeholder="Имя контакта"
                    name="name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                />
                {isNameError ? <small className="text-danger">{formik.errors.name}</small> : null}
            </div>
            <div className="mb-2">
                <input
                    type="tel"
                    className={
                        isPhoneError
                            ? "form-control border-danger shadow-none"
                            : "form-control"
                    }
                    placeholder="Номер телефона"
                    name="phone"
                    onKeyPress={phoneKeyPress}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phone}
                />
                {isPhoneError ? <small className="text-danger">{formik.errors.phone}</small> : null}
            </div>
            <div className="mb-2">
                <input
                    type="email"
                    className={
                        isEmailError
                            ? "form-control border-danger shadow-none"
                            : "form-control"
                    }
                    placeholder="email"
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                />
                {isEmailError ? <small className="text-danger">{formik.errors.email}</small> : null}
            </div>
            <div className="d-flex justify-content-around">
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isEmailError || isPhoneError || isNameError || isPhotoError}
                >
                    Сохранить
                </button>
            </div>
        </form>
    )
}