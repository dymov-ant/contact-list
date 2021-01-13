import {useState, useEffect} from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import {nanoid} from "nanoid";
import {ContactsList} from "./components/contactsLinst";
import {LoginPage} from "./components/loginPage";
import {useHttp} from "./hooks/http.hook";
import {Header} from "./components/header";

export const App = () => {

    const {request, loading} = useHttp();
    const [auth, setAuth] = useState(false);
    const [user, setUser] = useState({});
    const [error, setError] = useState(null);
    const [contacts, setContacts] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [searchMode, setSearchMode] = useState(false);

    useEffect(() => {
        setFiltered(contacts);
    }, [contacts, setFiltered]);

    useEffect(() => {
        const {user} = localStorage;
        if (user) {
            setUser(JSON.parse(user));
            setAuth(true);
        }
    }, []);

    const authorizationHandler = async ({email, password}) => {
        const data = await request(`/users?email=${email}&password=${password}`);
        if (data.length === 1) {
            setUser(data[0]);
            setError(null);
            localStorage.setItem("user", JSON.stringify({email, password}));
            setAuth(true);
        } else {
            setError("Неверная пара email/пароль");
        }
    };

    const logout = () => {
        localStorage.removeItem("user");
        setAuth(false);
    };

    const addContact = contact => {
        const newContact = {...contact, id: nanoid()};
        const arr = [newContact, ...contacts];
        setContacts(arr.sort(((a, b) => a.name > b.name ? 1 : -1)));
    };

    const updateContact = contact => {
        setContacts(contacts.map(c => c.id === contact.id ? {...contact} : c));
    };

    const deleteContact = id => {
        setContacts(contacts.filter(c => c.id !== id));
    };

    const searchContacts = text => {
        let result = [];
        if (text !== "") {
            setSearchMode(true);
            result = contacts.filter(contact => contact.name.toLowerCase().includes(text.toLowerCase()));
        } else {
            setSearchMode(false);
            result = contacts;
        }
        setFiltered(result);
    };


    return (
        <div className="container pt-3">
            {
                auth
                    ? <Switch>
                        <Route path="/contacts">
                            <Header userName={user.email} logout={logout}/>
                            <ContactsList
                                userName={user.email}
                                contacts={filtered}
                                loading={loading}
                                addContact={addContact}
                                updateContact={updateContact}
                                deleteContact={deleteContact}
                                searchMode={searchMode}
                                searchContacts={searchContacts}
                            />
                        </Route>
                        <Redirect to="/contacts"/>
                    </Switch>
                    : <Switch>
                        <Route path="/login">
                            <LoginPage
                                authorizationHandler={authorizationHandler}
                                error={error}
                                loading={loading}
                            />
                        </Route>
                        <Redirect to="/login"/>
                    </Switch>
            }
        </div>
    )
}