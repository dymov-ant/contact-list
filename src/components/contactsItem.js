import {useState} from "react";
import {ContactForm} from "./contactForm";

export const ContactsItem = ({id, name, phone, photo, email, updateContact, deleteContact}) => {
    const [editMode, setEditMode] = useState(false);

    const contactDeleteHandler = () => {
        deleteContact(id);
    };

    const onSubmit = values => {
        updateContact(values)
        setEditMode(false);
    };

    return (
        <div className="col">
            <div
                className="card h-100 position-relative"
            >
                {
                    !editMode && <>
                        <i
                            className="fas fa-pencil-alt fa-2x position-absolute"
                            style={{cursor: "pointer", bottom: "0.5rem", right: "3.5rem"}}
                            onClick={() => setEditMode(true)}
                        />
                        <i
                            className="fas fa-trash-alt fa-2x position-absolute"
                            style={{cursor: "pointer", bottom: "0.5rem", right: "0.5rem"}}
                            onClick={contactDeleteHandler}
                        />
                    </>
                }
                {
                    editMode
                        ? <ContactForm id={id} name={name} photo={photo} phone={phone} email={email} onSubmit={onSubmit} isEdit={true}/>
                        : <>
                            <img
                                src={photo || "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Placeholder_no_text.svg/1200px-Placeholder_no_text.svg.png"}
                                className="card-img-top"
                                alt="user"/>
                            <div className="card-body">
                                <h5 className="card-title">{name}</h5>
                                <p className="card-text">Телефон: {phone}</p>
                                <p className="card-text">Email: {email}</p>
                            </div>
                        </>
                }
            </div>
        </div>
    )
}