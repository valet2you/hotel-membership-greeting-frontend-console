import { EditIcon } from '@chakra-ui/icons';
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
    templateContentSchema,
    templateListSchema,
} from '../constants/typecode';
import { GuestCardProps, optionsType } from '../interfaces';
import { updateTemplateContent } from '../services/apiService';
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
    } = props;
    const [templateType, setTemplateType] = useState(template_type || '');
    const [updateLoading, setUpdateLoading] = useState(false);
    const [templateContent, setTemplateContent] = useState({
        ...content,
    });
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
                name,
                hotel_id,
                content: templateContent,
                template_type: templateType,
            };
            const response = await updateTemplateContent(data);
            if (response.status === 200) {
                const result = await response.json();
                console.log(result);

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

    const templateList = templateListSchema['WMaldives'];
    const contentOptionList = templateContentSchema[templateType];
    if (!templateType || contentOptionList.length === 0) return null;

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
                    <span className='name'>{name}</span>
                    <small>Guest Name:</small> {templateContent['guestName']} ||{' '}
                    <small>Template :</small> {templateType}
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
                                <FormLabel>Template Type</FormLabel>
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
                    <button className='btn btn-primary' onClick={updateContent} disabled={updateLoading}

                    >
                        {updateLoading  ? " Updating...":  "Update"}
                    </button>
                </div>
            )}
        </div>
    );
};

export default GuestCard;
