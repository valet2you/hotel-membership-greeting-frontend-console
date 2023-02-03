import { EditIcon } from '@chakra-ui/icons'
import { Box, FormControl, FormLabel, Input, Select, SimpleGrid } from '@chakra-ui/react'
interface GuestCardProps {
    guest: number;
    index: number;
    key: number;
    selectedUser: number
}
const GuestCard = (props: GuestCardProps) => {
    const { selectedUser, index } = props
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
                                        name='type'
                                    >
                                        <option value={'veg'}>GOLD</option>
                                        <option value={'non_veg'}>
                                            PLATINUM
                                        </option>
                                        <option value={'non_alcohol_beverages'}>
                                            TITANIUM
                                        </option>
                                    </Select>
                                </FormControl>
                            </Box>
                        </SimpleGrid>
                    </div>
                )}
        </div>
    )
}

export default GuestCard