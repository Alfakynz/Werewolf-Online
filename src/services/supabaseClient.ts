import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY

if (!supabaseUrl || !supabaseKey) {
	throw new Error(
		"❌ Erreur: VITE_SUPABASE_URL ou VITE_SUPABASE_KEY n'est pas défini dans le fichier .env",
	)
}

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
