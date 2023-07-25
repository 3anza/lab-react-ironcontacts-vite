import "./App.css";
import React, { useState } from "react";
import contactsJSON from "./contacts.json";

function App() {
  const [contactList, setContactList] = useState(contactsJSON.slice(0, 5))

  const addRandomContact = () => {
    if (contactList.length >= contactsJSON.length) {
      return;
    }
    const restContacts = contactsJSON.filter(
      (contact) => !contactList.includes(contact)
    )
    const randomContact =
      restContacts[Math.floor(Math.random() * restContacts.length)]

    setContactList((prevList) => [...prevList, randomContact])
  }

  const sortByName = () => {
    const sortedContacts = [...contactList].sort((a, b) => a.name.localeCompare(b.name))
  setContactList(sortedContacts)
  }

  const sortByPopularity = () => {
    const sortedContacts = [...contactList].sort((a, b) => b.popularity - a.popularity)
  setContactList(sortedContacts)
  }
  
  const deleteContact = (id) => {
    const updatedList = contactList.filter((contact) => contact.id !== id)
    setContactList(updatedList)
  }
  
  return (
    <div className="App">
      <h1>LAB | React IronContacts</h1>
      <div>
      <button onClick={addRandomContact}>AAdd Random Contact</button>
      <button onClick={sortByName}>Sort by Name</button>
      <button onClick={sortByPopularity}>Sort by Popularity</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won an Oscar</th>
            <th>Won an Emmy</th>
          </tr>
        </thead>
        <tbody>
          {contactList.map((contact, index) => (
            <tr key={index}>
              <td>
                <img
                src={contact.pictureUrl} 
                alt={contact.name}
                style={{ height: "200px" }} 
                />
              </td>
              <td>{contact.name}</td>
              <td>{contact.popularity}</td>
              <td>{contact.wonOscar ? "🏆" : null}</td>
              <td>{contact.wonEmmy ? "🌟" : null}</td>
              <td>
                <button onClick={() => deleteContact(contact.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
