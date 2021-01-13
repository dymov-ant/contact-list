export const Search = ({searchContacts}) => {

    const handleChange = event => {
        searchContacts(event.target.value);
    };

    return (
        <div className="mb-3">
            <input
                type="text"
                className="form-control"
                placeholder="Для поиска начните писать здесь..."
                onChange={handleChange}
            />
        </div>
    )
}