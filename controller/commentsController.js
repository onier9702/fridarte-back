
const { response } = require('express');
const fs = require('fs');
const path = require('path');
const { join } = require('path');

const getAllComments = () => {

    const url = join( __dirname, '../database/comments.json');

     // Get Comments
    if (!fs.existsSync(url)) {
        return {
            ok: false,
            msg: 'Path does not exist in getAllComments function'
        }
    }
    const resp = fs.readFileSync( url, { encoding: 'utf-8'});
    const data = JSON.parse(resp);
    return {
        ok: true,
        data
    }

}

const postComment = (req, res = response) => {

    try {
        
        const { text, author } = req.body;
        const url = join( __dirname, '../database/comments.json');

        const resp = getAllComments();
        if ( !resp.ok ) {
            res.status(404).json({
                ok: false,
                msg: 'Path does not exists'
            })
        }

        const comments = resp.data.comments;
        comments.unshift( { text, author } );
        const payload = { comments: comments  };
        fs.writeFileSync( url, JSON.stringify(payload) );
        const allComments = getComments( req, res );

        res.status(201).json(
            allComments
        )
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contact Admin please'
        })
    };

};

const getComments = ( req, res = response ) => {

    try {

        const url = join( __dirname, '../database/comments.json');
        console.log('URL getting comments api: ', url);
        if (!fs.existsSync(url)) {
            res.status(400).json({
                ok: false,
                msg: 'Path does not exists getting comments'
            })
        }
        const resp = fs.readFileSync( url, { encoding: 'utf-8'});
        const data = JSON.parse(resp);
        res.status(200).json(
            data.comments
        )
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contact Admin please'
        })
    }
    
}

module.exports = {
    postComment,
    getComments
}