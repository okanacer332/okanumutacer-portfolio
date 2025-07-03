// src/app/api/blog-admin/route.ts

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { title, summary, content } = body;

    // Basit doğrulama
    if (!title || !summary || !content) {
      return NextResponse.json({ message: 'Tüm alanlar zorunludur.' }, { status: 400 });
    }

    // Admin bilgilerini Base64 formatına çeviriyoruz (Basic Auth için)
    const username = 'admin';
    const password = 'Mersin.acer33';
    const basicAuth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');

    // Sunucu üzerinden Spring Boot API'sine istek atıyoruz
    const apiResponse = await fetch('http://localhost:8080/api/admin/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': basicAuth, // Güvenli kimlik bilgisini ekliyoruz
      },
      body: JSON.stringify({ title, summary, content }),
    });

    const responseData = await apiResponse.json();

    if (!apiResponse.ok) {
        // Spring'den gelen hata mesajını istemciye iletiyoruz
        return NextResponse.json({ message: responseData.message || 'Backend API hatası' }, { status: apiResponse.status });
    }

    // Başarılı olursa, Spring'den gelen cevabı istemciye (forma) geri döndürüyoruz
    return NextResponse.json(responseData, { status: 201 });

  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json({ message: 'Dahili sunucu hatası.' }, { status: 500 });
  }
}