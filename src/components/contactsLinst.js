import {ContactsItem} from "./contactsItem";
import {NewContact} from "./newContact";
import {Search} from "./search";
import {Spinner} from "./spinner";

export const ContactsList = ({contacts, loading, addContact, updateContact, deleteContact, searchMode, searchContacts}) => {

    if (loading) {
        return <Spinner/>
    }

    return (
        <div>
            <h1 className="display-6 text-center mb-3">Ваш список контактов</h1>
            <Search searchContacts={searchContacts}/>
            <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
                {!searchMode && <NewContact addContact={addContact}/>}
                {contacts.map(c =>
                    <ContactsItem
                        key={c.id}
                        id={c.id}
                        name={c.name}
                        email={c.email}
                        phone={c.phone}
                        photo={c.photo}
                        updateContact={updateContact}
                        deleteContact={deleteContact}
                    />
                )}
            </div>
        </div>
    )
}