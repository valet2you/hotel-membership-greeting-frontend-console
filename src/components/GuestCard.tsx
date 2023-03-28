import { CopyIcon, EditIcon } from '@chakra-ui/icons';
import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Select,
    SimpleGrid,
    Textarea,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import {
    GOLD,
    optionList,
    PLATINUM,
    templateContentSchema,
    templateListSchema,
    TITANIUM,
} from '../constants/typecode';
import { GuestCardProps, optionsType } from '../interfaces';
import {
    updateTemplateContent,
} from '../services/apiService';
import { useToast } from '@chakra-ui/react';

const GuestCard = (props: GuestCardProps) => {
    const {
        id,
        content,
        selectedUserID,
        template_type,
        name,
        hotel_id,
        guestCardClickHandler,
        getAllTemplateContent,
        qrLink,
        generateQRLink,
    } = props;
    const [templateType, setTemplateType] = useState(template_type || '');
    const [updateLoading, setUpdateLoading] = useState(false);
    const [templateContent, setTemplateContent] = useState({
        name: name,
        ...content,
    });
    const [templateName, setTemplateName] = useState(name || '');
    const toast = useToast();
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const name = e.target.name;
        const value = e.target.value;
        setTemplateContent({ ...templateContent, [name]: value });
    };

    const updateContent = async () => {
        setUpdateLoading(true);
        try {
            const data = {
                id,
                name: templateName,
                hotel_id,
                content: templateContent,
                template_type: templateType,
            };
            const response = await updateTemplateContent(data);
            if (response.status === 200) {
                const result = await response.json();
                toast({
                    title: 'Template updated successfully',
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                });
                getAllTemplateContent();
            }
        } catch (error) {
        } finally {
            setUpdateLoading(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(qrLink);
        toast({
            title: 'Copied to clipboard',
            status: 'success',
            duration: 1000,
            isClosable: true,
        });
    };
    const templateList = templateListSchema['WMaldives'];
    const contentOptionList = templateContentSchema[templateType];
    if (!templateType || contentOptionList.length === 0)
        return <p>No Option</p>;

    return (
        <div
            className={
                'guest-card ' + (selectedUserID === id ? 'selected' : '')
            }
        >
            <div
                className='guest-card-header'
                onClick={() => guestCardClickHandler(id)}
            >
                <div className='primary-name'>
                    <span
                        className={
                            'name ' +
                            (GOLD.includes(name)
                                ? 'gold'
                                : PLATINUM.includes(name)
                                ? 'platinum'
                                : TITANIUM.includes(name)
                                ? 'titanium'
                                : '')
                        }
                    >
                        {name}
                    </span>
                    <small>Guest Name:</small> {templateContent['guestName']} ||{' '}
                    <small>Membership :</small> {templateType}
                </div>
                <div className='primary-btn'>
                    <button className='btn btn-icon'>
                        <EditIcon />
                    </button>
                </div>
            </div>
            {selectedUserID === id && (
                <div className='guest-details'>
                    <SimpleGrid columns={3} spacing={5}>
                        <Box>
                            <FormControl mb={3}>
                                <FormLabel>
                                    Marriott Bonvoy Membership
                                </FormLabel>
                                <Select
                                    placeholder='Select option'
                                    name='templateType'
                                    value={templateType}
                                    onChange={(e) =>
                                        setTemplateType(e.target.value)
                                    }
                                    disabled
                                >
                                    {templateList.map((template, index) => (
                                        <option
                                            value={template.templateID}
                                            key={index}
                                        >
                                            {template.name}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box>
                            <FormControl mb={3}>
                                <FormLabel>QR Code Number</FormLabel>
                                <Select
                                    placeholder='Select option'
                                    name='name'
                                    value={templateName}
                                    onChange={(e) =>
                                        setTemplateName(e.target.value)
                                    }
                                    disabled
                                >
                                    {optionList.map((template, index) => (
                                        <option
                                            value={template.value}
                                            key={index}
                                        >
                                            {template.name}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </SimpleGrid>
                    <SimpleGrid columns={2} spacing={2}>
                        {contentOptionList.map((option: optionsType, index) => {
                            return (
                                <Box key={index}>
                                    <FormControl mb={1}>
                                        <FormLabel>{option.label}</FormLabel>
                                        {option.type === 'text' ? (
                                            <Input
                                                type={option.type}
                                                name={option.name}
                                                value={
                                                    templateContent[
                                                        option.name as keyof typeof templateContent
                                                    ] as string
                                                }
                                                placeholder={option.placeHolder}
                                                onChange={(e) =>
                                                    handleChange(e)
                                                }
                                            />
                                        ) : (
                                            <Textarea
                                                value={
                                                    templateContent[
                                                        option.name as keyof typeof templateContent
                                                    ] as string
                                                }
                                                name={option.name}
                                                placeholder={option.placeHolder}
                                                onChange={(e) =>
                                                    handleChange(e)
                                                }
                                            />
                                        )}
                                    </FormControl>
                                </Box>
                            );
                        })}
                    </SimpleGrid>
                    <div className='actions-wrapper'>
                        <button
                            className='btn btn-primary'
                            onClick={updateContent}
                            disabled={updateLoading}
                        >
                            {updateLoading ? ' Updating...' : 'Update'}
                        </button>
                        {/* <button
                            className='btn btn-primary'
                            onClick={() => generateQRLink(id)}
                            disabled={updateLoading}
                        >
                            Generate QR Link
                        </button> */}
                        {qrLink && (
                            <div className='qr-link-wrapper'>
                                <div className='qr-link'>{qrLink}</div>
                                <div
                                    className='qr-copy-btn'
                                    onClick={copyToClipboard}
                                >
                                    <CopyIcon />
                                    Copy
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default GuestCard;
