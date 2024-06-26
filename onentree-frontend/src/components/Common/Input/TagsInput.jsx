import { CloseSharp } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { 
  TagsInputWrapper, 
  TagsInputLabel,
  TagsInputContainer,
  TagsField,
  AddTag,
  TagsWrapper,
  Tag
} from "./TagsInputStyle";

export default function TagsInput({ id, text, placeholder, defaultTags, setState }) {

  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState("");

  useEffect(() => {
    if (defaultTags) {
      setTags(defaultTags);
    }
  }, [defaultTags]);

  const addTag = (e) => {
    const { code, type } = e;
    if (code == "Space" || type == "click") {
      if (currentTag.trim() !== "" && tags.length < 20) {
        setTags(prevTags => [...prevTags, currentTag.trim().toUpperCase()]);
        setState(prevTags => [...prevTags, currentTag.trim().toUpperCase()]);
        setCurrentTag("");
      }
    }
  }

  const removeTag = (index) => {
    setTags(tags.filter((tag, tagIndex) => tagIndex !== index)); 
    setState(tags.filter((tag, tagIndex) => tagIndex !== index)); 
  }

  return (
    <TagsInputWrapper>
      <TagsInputLabel htmlFor={id}>{text}</TagsInputLabel>
      <TagsInputContainer>
        <TagsField
          type="text" 
          placeholder={placeholder} 
          id={id} 
          value={currentTag}
          onChange={(e) => setCurrentTag(e.target.value)}
          onKeyUp={addTag}
          maxLength={1}
        />
        <AddTag onClick={addTag} />
      </TagsInputContainer>

      <TagsWrapper container>
        {tags.map((tag, index) => (
          <Tag key={index}>
            {tag}
            <CloseSharp 
              sx={{ color: "var(--grey-blue-02)", marginLeft: ".1rem", cursor: "pointer" }} 
              onClick={() => removeTag(index)} 
            />
          </Tag>
        ))}
      </TagsWrapper>

    </TagsInputWrapper>
  );
}
