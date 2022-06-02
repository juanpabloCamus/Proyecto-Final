const customStyles = {
    singleValue: provided =>({
      ...provided,
      color: '#46499C',
      fontSize: '16px',
        fontFamily: 'arial',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      fontWeight: 'bold',
      
    }),
   

    indicatorSeparator: provided => ({
        ...provided,
          display: 'none',
          
          
    }),
    
    dropdownIndicator: provided =>({
      ...provided,
      color: '#46499C',
      
      
    }),
    
    input: provided => ({
        ...provided,
        color: '#46499C',
        fontSize: '16px',
        fontFamily: 'arial',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      fontWeight: 'bold',
      
      
    }),
    
    option: (provided,state) => ({
      ...provided,
      color: '#46499C',
      fontSize: '16px',
      background: "rgba(239, 245, 250, 0.793)",
      fontFamily: 'arial',
      fontWeight: state.isSelected ? 'bold': null || state.isFocused ? 'bold': null,
    }),
    
    control: (base, state) => ({
        ...base,
        background: "rgba(239, 245, 250, 0.793)",
        width:'150px',
        border: '2px',
        borderRadius: "8px",
        boxShadow: "2px 2px 5px 1px lightgray",
        padding: "3px 10px"
    }),
  
  
    menu: (provided, state) => ({
      ...provided,
      padding: 0,
      color: '#46499C',
      background: "rgba(239, 245, 250, 0.793)",
      

    }),
  
    };
  
  
  export {customStyles}