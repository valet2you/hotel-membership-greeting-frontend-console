/* interfaces */

export interface userLoginData {
    username: string;
    password: string;
}
export interface contentType {
    welcomeTitle: string;
    guestName: string;
    description: string;
}
export interface templateContent {
    id: number;
    name?: string;
    template_type: string;
    content: contentType;
}
export interface GuestCardProps {
    id: number;
    template_type: string;
    selectedUserID: null | number;
    guestCardClickHandler(firstArgument: number): void;
    getAllTemplateContent(): void;
    
    content: contentType;
}
export interface optionsType {
    name: string;
    label: string;
    type: string;
    placeHolder: string;
}
