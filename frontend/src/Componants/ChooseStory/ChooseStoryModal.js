import React, { useState ,useEffect} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom";

const ChooseStoryModal = (props) => {
  const [stories,setStories]=useState([])
  useEffect(() => {
    if (props.stories !== null) {
      
      // const storyTitle = props.stories.map(s => s.title);
      setStories(props.stories);
      console.log(stories);
    }
  }, [props.stories]);
  
  const [storys, setStorys] = useState([
    
  ]);
  const [girlstorys, setGirlStorys] = useState([
    
  ]);
  const navigation=useNavigate("");
  
  const [chosenStory, setChosenStory] = useState("");
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="login-container">
        <div className="">
          <div className="">
            <ul className="letters">
              {(props.gender?stories:stories).map((story, id) => {
                return (
                  <li
                    key={id}
                    onClick={() => {
                      const datatoSend=story;
                      console.log(datatoSend);
                      setChosenStory(story.title);
                      navigation("/storycontent",{state:datatoSend})

                    }}

                  >
                   <p className="story-name">
                     {story.title}
                    </p> <hr />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ChooseStoryModal;
