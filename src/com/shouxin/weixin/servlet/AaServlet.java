package com.shouxin.weixin.servlet;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;

public class AaServlet extends HttpServlet {
	
	private String name;
	
	
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	/**
	 * 
	 */
	private static final long serialVersionUID = 7203526950172642707L;
	
	@Override
	public void init() throws ServletException {
		System.out.println("aaaa======");
	}
	public static void main(String[] args) {
		AaServlet a = new AaServlet();
		a.setName("¹þ¹þ");
		System.out.println(a.getName());
	}
}
