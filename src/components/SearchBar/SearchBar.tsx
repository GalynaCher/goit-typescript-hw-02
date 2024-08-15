import css from "./SearchBar.module.css";
import { Formik, Form, Field } from "formik";
import toast, { Toaster } from 'react-hot-toast';

interface SearchBarProps {
    onSearch: (searchCriteria: string) => Promise<void>,
    getTotalPages: number
}

const SearchBar: React.FC<SearchBarProps> = ({onSearch, getTotalPages}) => {
    return (
        <header>
            <Formik
                initialValues={{ searchCriteria: "" }}

                onSubmit={(values, actions) => {
                    onSearch(values.searchCriteria);
                    console.log("SearchBar: getTotalPages", getTotalPages);
                    console.log("SearchBar: values.searchCriteria", values.searchCriteria);
                    console.log("SearchBar: values", values);
                    if (!values.searchCriteria) { 
                        toast.error("Search string cannot be empty");
                        return;
                    }
                    // if (getTotalPages===0) {
                    //     toast.error("No search results found");
                    // }
                    actions.resetForm();
                }}
            >
                <Form> 
                    <Field
                        name="searchCriteria"
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        className={css.searchInput}
                    />
                    <button type="submit" className={css.searchButton}>Search</button>
                </Form>
            </Formik>
            <Toaster position="bottom-right" />
        </header>        
    )
}

export default SearchBar;