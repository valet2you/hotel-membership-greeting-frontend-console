interface Item {
    name: string;
    label: string;
    type: string;
    placeHolder: string;
}
interface templateContentInterface {
    [key: string]: Item[];
}
export const templateListSchema = {
    WMaldives: [
        {
            name: 'GOLD',
            templateID: 'GOLD',
        },
        {
            name: 'PLATINUM',
            templateID: 'PLATINUM',
        },
        {
            name: 'TITANIUM',
            templateID: 'TITANIUM',
        },
    ],
};

export const templateContentSchema: templateContentInterface = {
    GOLD: [
        {
            name: 'welcomeTitle',
            label: 'Welcome Title',
            type: 'text',
            placeHolder: 'title',
        },
        {
            name: 'guestName',
            label: 'Guest Name',
            type: 'text',
            placeHolder: 'Enter guest name',
        },
        {
            name: 'description',
            label: 'Description',
            type: 'textarea',
            placeHolder: 'Enter description',
        },
    ],
    PLATINUM: [
        {
            name: 'welcomeTitle',
            label: 'Welcome Title',
            type: 'text',
            placeHolder: 'title',
        },
        {
            name: 'guestName',
            label: 'Guest Name',
            type: 'text',
            placeHolder: 'Enter guest name',
        },
        {
            name: 'description',
            label: 'Description',
            type: 'textarea',
            placeHolder: 'Enter description',
        },
    ],
    TITANIUM: [
        {
            name: 'welcomeTitle',
            label: 'Welcome Title',
            type: 'text',
            placeHolder: 'title',
        },
        {
            name: 'guestName',
            label: 'Guest Name',
            type: 'text',
            placeHolder: 'Enter guest name',
        },
        {
            name: 'description',
            label: 'Description',
            type: 'textarea',
            placeHolder: 'Enter description',
        },
    ],
};

export const optionList = [
    { value: 'G1', name: 'G1' },
    { value: 'G2', name: 'G2' },
    { value: 'G3', name: 'G3' },
    { value: 'G4', name: 'G4' },
    { value: 'G5', name: 'G5' },
    { value: 'G6', name: 'G6' },
    { value: 'G7', name: 'G7' },
    { value: 'G8', name: 'G8' },
    { value: 'G9', name: 'G9' },
    { value: 'G10', name: 'G10' },
    { value: 'P1', name: 'P1' },
    { value: 'P2', name: 'P2' },
    { value: 'P3', name: 'P3' },
    { value: 'P4', name: 'P4' },
    { value: 'P5', name: 'P5' },
    { value: 'P6', name: 'P6' },
    { value: 'P7', name: 'P7' },
    { value: 'P8', name: 'P8' },
    { value: 'P9', name: 'P9' },
    { value: 'P10', name: 'P10' },
    { value: 'T1', name: 'T1' },
    { value: 'T2', name: 'T2' },
    { value: 'T3', name: 'T3' },
    { value: 'T4', name: 'T4' },
    { value: 'T5', name: 'T5' },
    { value: 'T6', name: 'T6' },
    { value: 'T7', name: 'T7' },
    { value: 'T8', name: 'T8' },
    { value: 'T9', name: 'T9' },
    { value: 'T10', name: 'T10' },
];
