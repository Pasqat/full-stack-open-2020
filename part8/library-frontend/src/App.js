import React, {useState, useEffect} from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommended from "./components/Recommended";

import {useQuery, useSubscription, useApolloClient} from "@apollo/client";
import {LOGGEDIN_USER, BOOK_ADDED, ALL_BOOKS} from "./queries";

const App = () => {
    const [page, setPage] = useState("authors");
    const [token, setToken] = useState(null);

    const result = useQuery(LOGGEDIN_USER);
    const client = useApolloClient()

    const updateCacheWith = (addedBook) => {
        const includeIn = (set, object) =>
            set.map(p => p.id).includes(object.id)

        const dataInStore = client.readQuery({ query: ALL_BOOKS})
        if(!includeIn(dataInStore.allBooks, addedBook)) {
            client.writeQuery({
                query: ALL_BOOKS,
                data: { allBooks: dataInStore.allBooks.concat(addedBook)}
            })
        }
    }

    useSubscription(BOOK_ADDED, {
        onSubscriptionData: ({subscriptionData}) => {
            const addedBook = subscriptionData.data.bookAdded
            window.alert(`${subscriptionData.data.bookAdded.title} added`)
            updateCacheWith(addedBook)
        }
    })

    useEffect(() => {
        const token = localStorage.getItem("library-token");
        if (token) {
            setToken(token);
        }
    }, []);

    const logout = () => {
        setToken(null);
        localStorage.clear();
        client.resetStore()
    };

    return (
        <div>
            <div>
                <button onClick={() => setPage("authors")}>authors</button>
                <button onClick={() => setPage("books")}>books</button>
                {token && <button onClick={() => setPage("add")}>add book</button>}
                {token && (
                    <button onClick={() => setPage("recommended")}>recommend</button>
                )}
                {token && <button onClick={() => logout()}> logout</button>}
                {!token && <button onClick={() => setPage("login")}>login</button>}
            </div>

            <Authors show={page === "authors"} />

            <Books show={page === "books"} />

            <NewBook show={page === "add"} updateCacheWith={updateCacheWith}  />

            <Recommended show={page === "recommended"} user={result.data} />

            <LoginForm
                show={page === "login"}
                setToken={setToken}
                setPage={setPage}
            />
        </div>
    );
};

export default App;
