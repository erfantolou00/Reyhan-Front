import { createClient } from "@/lib/supabase/client"
import { NextResponse } from "next/server";

export  async function GET() {
    try {
        const supabase = await createClient()
        const { data, error } = await supabase
            .from("categories")
            .select("*")

        if (error) throw error;

        return NextResponse.json(data);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }

} 