## Characters

This object represents a character from the Lord of the Rings universe. Use it to explore their backgrounds, affiliations, and key events in their lives.

# !resource The Character object

```jsonc ! THE CHARACTER OBJECT
{
  "id": "char_Ar4g0rnK1ng",
  "status": "Alive",
  "race": "Human",
  "birth": "Third Age 2931",
  "title": "King of Gondor",
  "weapon": "Andúril",
  "email": "aragorn@minastirith.gon",
  "quest": "Destroy the One Ring",
  "skills": {
    "strength": 90,
    "wisdom": 85,
    "leadership": 95
  },
  "allies": [
    "Gandalf",
    "Legolas",
    "Gimli"
  ],
  "enemies": ["Sauron", "Saruman"]
}
```

## !main Attributes

### !! id string

Unique identifier for the character.

### !! status enum

The character’s current status. Can be Alive, Deceased, or Unknown.

### !! skills object

The character’s skills and abilities.

#### !! skills.strength number

The character’s strength, measured on a scale of 0–100.

#### !! skills.wisdom number

The character’s wisdom, measured on a scale of 0–100.

### !! email string

The character’s contact address in the fictional universe.

## !extra More attributes

### !! object string

String representing the object’s type. Characters of the same race share similar attributes.

### !! title string

Official title or position held by the character in their realm.

### !! affiliation string

Key groups or alliances the character is associated with.

### !! weapon string

The character's preferred weapon or item of significance.

### !! quest string

The main quest or objective associated with the character.
