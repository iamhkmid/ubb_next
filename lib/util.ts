import jwt from "jsonwebtoken";
// Make an object serializable to JSON.
//
// Useful to convert an object which may contain non-serializeable data such as
// Dates to an object that doesn't
export function makeSerializable<T extends any>(o: T): T {
    return JSON.parse(JSON.stringify(o))
}

export const stringPath = (str: string) =>
    str.replace(/([^a-z0-9 ]+)/gi, "-").replace(/\s/g, "-");

type TCreateToken = {
    username: string;
    fullName: string
};
export const createToken = (props: TCreateToken) => {
    const maxAge = 1 * 24 * 60 * 60;
    return jwt.sign(props, process.env.JWT_SECRET as string, {
        expiresIn: maxAge,
    });
};