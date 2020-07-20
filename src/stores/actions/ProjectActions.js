export const createProject = (project) => {
    // in thunk we will return a Function instead.
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        // Holding the Dispatch while making async Call.
        // maybe save the Object to Database then Dispatch it to the Local Store.

        // push the Data to FireStore. --- adding Document to Firestore collection.
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;

        // collection name in firestore DB.
        firestore.collection('projects').add({
            ...project,
            authorFirstName: profile.firstName,
            authorLastName: profile.lastName,
            authorId: authorId,
            createdAt: new Date()
        }).then(() => {
            // when the async task is Completed this is a promise it will fired up once it finished
            // then dispatch them to redux Store.
            dispatch({type: 'CREATE_PROJECT', project});
        }).catch((err) => {
            // dispatch another Error .
            dispatch({type: 'CREATE_PROJECT_ERROR', err});
        });


    }
};
