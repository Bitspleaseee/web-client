
export const LOGGED_IN = "LOGGED_IN"
export const LOGGED_OUT = "LOGGED_OUT"

export const loggedInAs = (userdata) =>
({
    type: LOGGED_IN,
    payload: userdata
})

export const loggedOut = () =>
({
    type: LOGGED_OUT
})
