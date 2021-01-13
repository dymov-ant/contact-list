import {ContactForm} from "./contactForm";

export const NewContact = ({addContact}) => {

    const onSubmit = values => {
        addContact(values);
    };

    return (
        <div className="col">
            <div className="card h-100">
                <ContactForm
                    id=""
                    name=""
                    photo=""
                    phone=""
                    email=""
                    onSubmit={onSubmit}
                    isEdit={false}
                />
            </div>
        </div>
    )
}