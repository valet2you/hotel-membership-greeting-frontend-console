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
            name: 'title',
            label: 'Title',
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
            name: 'title',
            label: 'Title',
            type: 'text',
            placeHolder: 'title',
        },
    ],
    TITANIUM: [
        {
            name: 'title',
            label: 'Title',
            type: 'text',
            placeHolder: 'title',
        },
        {
            name: 'guestName',
            label: 'Guest Name',
            type: 'text',
            placeHolder: 'Enter guest name',
        },
    ],
};
