import React, { useContext, useState, useEffect } from "react";
import { auth, db } from "./firebase";

const Context = React.createContext();

export function useAuth() {
  return useContext(Context);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  // global function to generate random ids
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  // generates id
  const generateString = (prefix = "", length = 10, suffix = "") => {
    let result = prefix;
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    result += suffix;
    return result;
  };

  const signup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const logout = () => {
    return auth.signOut();
  };

  const resetPassword = (email) => {
    return auth.sendPasswordResetEmail(email);
  };

  const updateEmail = (email) => {
    return currentUser.updateEmail(email);
  };

  const updatePassword = (password) => {
    return currentUser.updatePassword(password);
  };

  // tournaments

  // get tournaments
  const getTournaments = async () => {
    return db
      .collection("tournaments")
      .get()
      .then((snapshot) => {
        return snapshot.docs;
      });
  };

  const setupTableHead = () => {
    const headings = [
      "Tournament Name",
      "Game Type",
      "Tournament Date",
      "Tournament Time",
      "Tournament Sponsors",
      "Actions",
    ];
    let res = [];
    for (let i = 0; i < headings.length; i++) {
      res.push(<th key={i}>{headings[i]}</th>);
    }
    return res;
  };

  const setupTournaments = async () => {
    const tournaments = await getTournaments();
    let res = [];
    tournaments.forEach((doc) => {
      let data = doc.data();
      // adding document id to the data object (used for edit / delete)
      data["documentId"] = doc.id;
      res.push(data);
    });
    return res;
  };

  // add tournament
  const addTournament = (
    tournamentName,
    gameType,
    tournamentDate,
    tournamentTime,
    tournamentSponsors
  ) => {
    // call generator function
    const tournamentId = generateString("tournament-", 20);

    db.collection("tournaments")
      .add({
        tournamentId: tournamentId,
        tournamentName: tournamentName,
        gameType: gameType,
        tournamentDate: tournamentDate,
        tournamentTime: tournamentTime,
        tournamentSponsors: tournamentSponsors,
      })
      .then(() => {
        console.log("Add success!");
        const addTournamentForm = document.querySelector("#add-tournament");
        addTournamentForm.reset();
      })
      .catch((err) => console.log(err.message));
  };

  // delete tournament
  const deleteTournament = (tournamentId) => {
    db.collection("tournaments")
      .doc(tournamentId)
      .delete()
      .then(() => {
        console.log("Delete Success!");
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    addTournament,
    getTournaments,
    setupTableHead,
    setupTournaments,
    deleteTournament,
  };

  return (
    <Context.Provider value={value}>{!loading && children}</Context.Provider>
  );
}
