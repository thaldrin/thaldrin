import { createClient } from '@supabase/supabase-js'
import config from '../../config'
import { Server } from "./types";

const supabase = createClient(config.supabase.url, config.supabase.key)

export default supabase