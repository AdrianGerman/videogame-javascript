/*
 * Reglas:
 * El final de cada nivel debe ser el inicio del siguiente
 */

const emojis = {
  "-": " ",
  O: "🚪",
  X: "💣",
  I: "🎁",
  PLAYER: "💀",
  BOMB_COLLISION: "🔥",
  GAME_OVER: "👎",
  WIN: "🏆",
  HEART: "❤️",
};

const maps = [];

maps.push(`
    IXXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    OXXXXXXXXX
  `);
maps.push(`
    O---------
    --XXXXXXXX
    --X-XXXXX-
    --X-----X-
    --X--X--X-
    --X-----X-
    --X-------
    --X------I
    --XXX-XXXX
    ----------
  `);
maps.push(`
    O--------X
    XXXXXXXX-X
    XXXXXXXX-X
    XXXXXXXX-X
    XXXXXXXX-X
    XXXXXXXX-X
    XXXXXXXX-X
    XXXXXXXX-X
    XXXXXXXX-X
    I--------X
  `);
maps.push(`
    I-----XXXX
    XXXXX-XXXX
    XX----XXXX
    XX-XXXXXXX
    XX-----XXX
    XXXXXX-XXX
    XX-----XXX
    XX-XXXXXXX
    XX-----OXX
    XXXXXXXXXX
  `);
maps.push(`
    O--XXXXXXX
    X--XXXXXXX
    XX----XXXX
    X--XX-XXXX
    X-XXX--XXX
    X-XXXX-XXX
    XX--XX--XX
    XX--XXX-XX
    XXXX---IXX
    XXXXXXXXXX
  `);

maps.push(`
    O---------
    --XXXXXXXX
    ----------
    --X-----X-
    --X--X--X-
    --X-----X-
    --X--X--X-
    --X---I--X
    --XXXXXXXX
    ----------
  `);
maps.push(`
    O--------X
    XXXXXXXX-X
    XXXXX----X
    XXXXXXX-XX
    X-------XX
    X-XXXXXXXX
    X-------XX
    XXXXXXX-XX
    X-----X-XX
    I-XXX---XX
  `);
