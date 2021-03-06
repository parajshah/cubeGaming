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

  // users
  const signup = async (email, password, firstName, lastName, phone) => {
    const cubeId = generateString("cube_id_", 10);

    return auth.createUserWithEmailAndPassword(email, password).then(() => {
      db.collection("users").add({
        cubeId: cubeId,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        email: email,
        pubgUsername: "",
        valorantUsername: "",
        freeFireUsername: "",
        whatsAppPhone: "",
      });
    });
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

  const updateEmail = (email, documentId) => {
    return currentUser.updateEmail(email).then(() => {
      db.collection("users").doc(documentId).update({
        email: email,
      });
    });
  };

  const updatePassword = (password) => {
    return currentUser.updatePassword(password);
  };

  const updateCurrentUserDetails = (
    documentId,
    firstName,
    lastName = "",
    pubgUsername = "",
    valorantUsername = "",
    freeFireUsername = "",
    whatsAppPhone = ""
  ) => {
    return db.collection("users").doc(documentId).update({
      firstName: firstName,
      lastName: lastName,
      pubgUsername: pubgUsername,
      valorantUsername: valorantUsername,
      freeFireUsername: freeFireUsername,
      whatsAppPhone: whatsAppPhone,
    });
  };

  const getCurrentUserData = async () => {
    if (currentUser) {
      return db
        .collection("users")
        .where("email", "==", currentUser.email)
        .get()
        .then((snapshot) => {
          return snapshot.docs;
        });
    }
  };

  const setupCurrentUserData = async () => {
    const userSnapshot = await getCurrentUserData();
    let res = [];
    userSnapshot.forEach((doc) => {
      const data = doc.data();
      data["document-id"] = doc.id;
      res.push(data);
    });
    return res;
  };

  // tournaments

  // get all tournaments
  const getTournaments = async () => {
    return db
      .collection("tournaments")
      .get()
      .then((snapshot) => {
        return snapshot.docs;
      });
  };

  // get single tournament
  const getTournament = async (id) => {
    return db
      .collection("tournaments")
      .where("tournamentId", "==", id)
      .get()
      .then((snapshot) => {
        return snapshot.docs;
      });
  };

  // returns single tournament
  const setupTournament = async (id) => {
    const tournaments = await getTournament(id);
    let res = [];
    tournaments.forEach((doc) => {
      let data = doc.data();
      // adding document id to the data object (used for edit / delete)
      data["documentId"] = doc.id;
      res.push(data);
    });
    return res;
  };

  // returns table headers
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

  // returns all tournaments
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
    const tournamentId = generateString("t_id_", 20);

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
    getTournament,
    getTournaments,
    setupTableHead,
    setupTournament,
    setupTournaments,
    deleteTournament,
    setupCurrentUserData,
    updateCurrentUserDetails,
  };

  return (
    <Context.Provider value={value}>{!loading && children}</Context.Provider>
  );
}
