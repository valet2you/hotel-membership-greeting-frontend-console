import { EditIcon } from '@chakra-ui/icons'
import { Box, FormControl, FormLabel, Input, Select, SimpleGrid, Textarea } from '@chakra-ui/react'
import React, { useState } from 'react';
import { templateContentSchema, templateListSchema } from '../constants/typecode';
interface GuestCardProps {
    guest: number;
    index: number;
    key: number;
    selectedUser: number;
    template: string;
}
const GuestCard = (props: GuestCardProps) => {
    const { selectedUser, index, template } = props;
    const [templateType, setTemplateType] = useState("GOLD");



    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        // setError('');
        let value = null;
        const name = e.target.name;
        const type = e.target.type;
        if (type === 'checkbox') {
            // value = e.target.checked;
            // if (name === 'enabled' || name === 'is_recommended') {
            //     value = Number(value);
            // }
        } else if (type === 'file') {
            // value = e.target.files[0];
            // convertImageToBase64(value, (imgURL) => setLocalImageURL(imgURL));
        } else {
            value = e.target.value;
        }
        // setFormData({ ...formData, [name]: value });
    };

    const templateList = templateListSchema["WMaldives"]
    const contentOptionList = templateContentSchema[templateType]
    return (
        <div className={'guest-card ' + (selectedUser === index ? "selected" : "")}>
            <div className='guest-card-header'>
                <div className='primary-name'>Vineet -  Room 4001</div>
                <div className='primary-btn'>
                    <button className='btn btn-icon'>
                        <EditIcon />
                    </button>
                </div>
            </div>
            {selectedUser === index && (
                <div className='guest-details'>
                    <SimpleGrid columns={3} spacing={5}>
                        <Box>
                            <FormControl mb={3}>
                                <FormLabel>Template Type</FormLabel>
                                <Select
                                    placeholder='Select option'
                                    name='templateType'
                                    value={templateType}
                                    onChange={(e) => setTemplateType(e.target.value)}>
                                    {
                                        templateList.map(template => <option value={template.templateID}>{template.name}</option>)
                                    }
                                </Select>
                            </FormControl>
                        </Box>
                    </SimpleGrid>
                    <SimpleGrid columns={2} spacing={2}>
                        {contentOptionList.map(option => {
                            return (
                                <Box>
                                    <FormControl mb={1}>
                                        <FormLabel>{option.label}</FormLabel>
                                        {option.type === 'text' ?
                                            <Input type={option.type} name={option.name} value={"name"} placeholder={option.placeHolder} onChange={(e) => handleChange(e)} />
                                            :
                                            <Textarea value={"name"} name={option.name} placeholder={option.placeHolder} onChange={(e) => handleChange(e)} />
                                        }
                                    </FormControl>
                                </Box>
                            )
                        })}
                    </SimpleGrid>
                    <button className='btn btn-primary'>Update</button>

                </div>
            )}
        </div>
    )
}

export default GuestCard