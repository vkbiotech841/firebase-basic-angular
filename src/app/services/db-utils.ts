
// Assigning function type. Here, we are using <T>, generic type for the convertSnaps function, so that we can dynamically assign type to this function. (e.g Course). and Here it is returning array of generic type <T[]> (e.g Course[]).

export function convertSnaps<T>(results) {
    return <T[]>results.docs.map(snap => {
        return {
            id: snap.id,
            ...<any>snap.data()
        }
    })
}