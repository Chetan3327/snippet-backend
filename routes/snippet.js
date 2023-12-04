import express from 'express'
import SnippetModel from '../models/snippet.js'
import SectionModel from '../models/section.js'
const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const snippets = await SnippetModel.find({})
        if(!snippets){
            return res.status(404).json({ error: 'snippets not found' });
        }
        res.status(200).json(snippets)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Internal server error"})
    }
})

router.get('/:snippetId', async (req, res) => {
    try {
        const snippet = await SnippetModel.findById(req.params.snippetId)        
        if(!snippet){
            return res.status(404).json({ error: 'snippet not found' });
        }
        res.status(200).json(snippet)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Internal server error"})
    }
})

router.post('/', async (req, res) => {
    try {
        const section = await SectionModel.findById(req.body.sectionId)
        if(!section){
            return res.status(500).json({ error: ' Failed to create the Snippet ' });
        }
        console.log('section', section)
        
        const snippet = await SnippetModel.create({...req.body, sectionId: req.body.sectionId})
        if(!snippet){
            return res.status(500).json({ error: ' Failed to create the Snippet ' });
        }
        console.log('snippet', snippet)

        section.snippets.push(snippet._id)
        await section.save()
        console.log('section', section)


        res.status(200).json({ message: 'Snippet Created successfully' })
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Internal server error"})
    }
})

router.put('/:snippetId', async (req, res) => {
    try {
        const snippet = await SnippetModel.findById(req.params.snippetId)        
        if(!snippet){
            return res.status(404).json({ error: 'snippet not found' });
        }
        await SnippetModel.findByIdAndUpdate(req.params.snippetId, req.body)
        if (!snippet) {
            return res.status(500).json({ error: 'snippet not Updated' });
        }
        res.status(200).json({ message: 'Snippet Updated successfully' })
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Internal server error"})
    }
})

router.delete('/:snippetId', async (req, res) => {
    try {
        const snippet = await SnippetModel.findById(req.params.snippetId)        
        if(!snippet){
            return res.status(404).json({ error: 'snippet not found' });
        }
        await SnippetModel.findByIdAndDelete(req.params.snippetId)
        if (!snippet) {
            return res.status(500).json({ error: 'snippet not Deleted' });
        }
        res.status(200).json({ message: 'Snippet Deleted successfully' })
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Internal server error"})
    }
})


export default router