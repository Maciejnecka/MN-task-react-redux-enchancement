import { useState } from 'react';

const useFormVisibility = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    return { isVisible, toggleVisibility };
};

export default useFormVisibility;
