import React from 'react';
import { shallow } from 'enzyme';

import NewAdvertForm from './NewAdvertForm';

describe('NEW ADVERT FORM', () => {
    const props = {
        onSubmit: jest.fn()
    }

    const render = () => shallow(<NewAdvertForm {...props} />);

    test('should render', () => {
        const wrapper = render ();
        expect(wrapper.exists()).toBe(true);
    })

    test('should call submit', () => {
        const wrapper = render();
        const form = wrapper.find('form');
        form.simulate('submit', {preventDefault: () => {}});
        expect(props.onSubmit).toHaveBeenCalled();
    })

    test('should submit advert', () => {
        const advert = {
            name: 'Prod1',
            sale: true,
            price: 20, 
            tags: ['tag1'], 
            photo: null
        }
        const wrapper = render();
        const nameField = wrapper.find('[name="name"]');
        nameField
            .props()
            .onChange({target: {name: 'name', value: advert.name}});

        const saleField = wrapper.find('[name="sale"]');
        saleField
            .props()
            .onChange({target: {name: 'sale', value: advert.sale}});

        const priceField = wrapper.find('[name="price"]');
        priceField
            .props()
            .onChange({target: {name: 'price', value: advert.price}});
        
        const tagsField = wrapper.find('[name="tags"]');
        tagsField
            .props()
            .onChange({target: {name: 'tags', value: advert.tags}});
        
        const photoField = wrapper.find('[name="photo"]');
        photoField
            .props()
            .onChange({target: {name: 'photo', value: advert.photo}});
    
        const form = wrapper.find ('form');
        form.simulate('submit', { preventDefault: () => {}});
        expect(wrapper.find('button').props().disabled).toBe(false);
        expect(props.onSubmit).toHaveBeenCalledWith(advert);       
        
    }); 
    
    test('snapshot testing', () => {
        const wrapper = render();
        expect (wrapper).toMatchSnapshot();
    })

});