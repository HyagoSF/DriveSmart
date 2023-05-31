// create a session type

interface User {
	name?: string | null;
	email?: string | null;
	image?: string | null;
}

export interface SessionType {
	user?: User;
}
