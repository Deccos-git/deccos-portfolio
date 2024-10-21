import { useState } from 'react'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

const SelectEffects = ({ setSelectedEffects, index, category }) => {
    // State
    const [expandedCategoryList, setExpandedCategoryList] = useState('')

    // Hooks
    const secundairyColor = '#blue'

    // Select subeffect
    const effectHandler = (e, effect, questions) => {
      const isChecked = e.target.checked;
      const category = e.target.dataset.category;
      const id = e.target.dataset.id;
  
      if (isChecked) {
        // Checkbox is selected, add the item to the state
        setSelectedEffects(prevState => [
          ...prevState,
          { effect: effect, category: category, questions: questions, id: id }
        ]);
      } else {
        // Checkbox is deselected, remove the item from the state
        setSelectedEffects(prevState => 
          prevState.filter(item => item.effect !== effect)
        );
      }
    };
  
    return (
      <div key={category.id}>
        <div 
          className="effect-selector-title-container" 
          onClick={() => setExpandedCategoryList(!expandedCategoryList)}
          style={{ backgroundColor: expandedCategoryList ? "#f4f4f4" : "white" }}
        >
          <h3>{category.name}</h3>
          {expandedCategoryList 
            ? <KeyboardArrowDownOutlinedIcon style={{ transform: 'rotate(180deg)' }} />
            : <KeyboardArrowDownOutlinedIcon />}
        </div>
        <div style={{ display: expandedCategoryList ? 'block' : 'none' }}>
          <table>
            <thead>
              <tr>
                <th style={{ backgroundColor: secundairyColor }}></th>
                <th style={{ backgroundColor: secundairyColor }}>EFFECT</th>
                <th style={{ backgroundColor: secundairyColor }}>VRAGEN</th>
                <th style={{ backgroundColor: secundairyColor }}>OMSCHRIJVING</th>
              </tr>
            </thead>  
            {category.effects.map((effect) => (
              <tr key={effect.name}>
                <td>
                  <input 
                    type="checkbox" 
                    data-category={category.name}
                    data-id={effect.id}
                    onChange={(e) => effectHandler(e, effect.name, effect.questions)} 
                  />
                </td>
                <td>
                  <p>{effect.name}</p>
                </td>
                <td>
                  {effect.questions && effect.questions.map((question, index) => (
                    <div id='meetstandaard-efeect-questions-item-container'>
                      <p>{index + 1}.</p>
                      <p>{question.name}</p>
                    </div>
                  ))}
                </td>
                <td>
                  <p>{effect.description}</p>
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    );
}

export default SelectEffects